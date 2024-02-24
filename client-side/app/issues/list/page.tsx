'use client';
import { IssueStatusBadge, Link } from '@/app/components';
import { API_URL } from '@/environment';
import { issues as IssueType, issues_status as Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
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
  searchParams: { status: Status };
}

const IssuesPage = ({ searchParams }: Props) => {
  const { data, error } = useSWR(`${API_URL}/issues`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <LoadingIssuesPage />;

  const filteredIssues = data.issues.filter((issue: IssueType) => {
    if (searchParams.status) return issue.status === searchParams.status;
    return true;
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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
