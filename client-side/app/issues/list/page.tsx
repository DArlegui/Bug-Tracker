'use client';
import { IssueStatusBadge, Link } from '@/app/components';
import { API_URL } from '@/environment';
import { issues as IssueType, issues_status as Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import useSWR from 'swr';
import IssueActions from './IssueActions';
import LoadingIssuesPage from './loading';

/*https://swr.vercel.app/docs/getting-started */
const fetcher = async (url: RequestInfo, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

interface Props {
  searchParams: { status: Status; orderBy: keyof IssueType };
}

const IssuesPage = ({ searchParams }: Props) => {
  const { data, error } = useSWR(`${API_URL}/issues?orderBy=${searchParams.orderBy}`, fetcher);

  if (error) return <div>Failed to load... Backend Server is probably not on</div>;
  if (!data) return <LoadingIssuesPage />;

  const filteredIssues = data.issues.filter((issue: IssueType) => {
    if (searchParams.status) return issue.status === searchParams.status;
    return true;
  });

  const columns: {
    label: string;
    value: keyof IssueType;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.label} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline ml-1" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredIssues.map((issue: IssueType) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell ">
                  {issue.createdAt ? new Date(issue.createdAt).toDateString() : 'N/A'}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
