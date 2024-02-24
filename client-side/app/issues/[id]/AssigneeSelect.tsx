'use client';
import { API_URL } from '@/environment';
import { issues as IssueType, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

const fetcher = async (url: RequestInfo, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

const AssigneeSelect = ({ issue }: { issue: IssueType }) => {
  const { data: users, error } = useSWR<User[]>(`/api/users`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!users) return <Skeleton height="1.9rem" />;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ''}
      onValueChange={(userId) => {
        axios.patch(`${API_URL}/issues/${issue.id}/assign`, {
          assignedToUserId: userId === 'unassigned' ? null : userId,
        });
      }}>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
