'use client';
import { IssueStatusBadge, Link } from '@/app/components';
import { Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { IssueType, getIssues } from '../api/IssueService';
import IssueActions from './IssueActions';
import LoadingIssuesPage from './loading';

const IssuesPage = () => {
  const [issues, setIssues] = useState<IssueType[]>([]);

  useEffect(() => {
    async function fetchIssues() {
      const fetchIssues = await getIssues();
      setIssues(fetchIssues as IssueType[]);
    }
    fetchIssues();
  }, []);

  return issues.length == 0 ? (
    <LoadingIssuesPage />
  ) : (
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
                <Table.Cell className="hidden md:table-cell ">{new Date(issue.createdAt).toDateString()}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
