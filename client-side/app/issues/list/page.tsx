import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { issues_status as Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;

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
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
