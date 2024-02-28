import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import Pagination from './components/Pagination';

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const open = await prisma.issues.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issues.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issues.count({ where: { status: 'CLOSED' } });
  return (
    <>
      {/* <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />; */}
      {/* <LatestIssues /> */}
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
