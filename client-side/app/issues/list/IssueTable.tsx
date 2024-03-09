import { IssueStatusBadge } from '@/app/components';
import { issues as IssueType, issues_status as Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { default as Link, default as NextLink } from 'next/link';

export interface IssueQuery {
  status: Status;
  orderBy: keyof IssueType;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: IssueType[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
              <Table.Cell className="hidden md:table-cell ">{issue.createdAt ? new Date(issue.createdAt).toDateString() : 'N/A'}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof IssueType;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
