'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

const fetcher = async (url: RequestInfo, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

const AssigneeSelect = () => {
  const { data: users, error } = useSWR<User[]>(`/api/users`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!users) return <Skeleton height="1.9rem" />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
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
