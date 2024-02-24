// import { Link } from '@/app/components';
import { Button, Flex } from '@radix-ui/themes';
import IssueStatusFilter from './IssueStatusFilter';
import Link from 'next/link';

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new" style={{ color: 'white' }}>
          New Issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
