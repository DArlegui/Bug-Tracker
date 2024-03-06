import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { issues as IssueType, issues_status as Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof IssueType;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof IssueType;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where = { status };

  const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issues.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issues.count({ where });

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
          {issues.map((issue: IssueType) => {
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
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
