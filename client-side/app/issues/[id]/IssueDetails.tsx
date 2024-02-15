import { IssueType } from '@/app/api/IssueService';
import { IssueStatusBadge } from '@/app/components';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: IssueType }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="gap-2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{new Date(issue.createdAt).toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
