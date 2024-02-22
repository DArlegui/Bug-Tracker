import { Badge } from '@radix-ui/themes';
import { issues_status as Status } from '@prisma/client';

const statusMap: Record<Status, { label: string; color: 'red' | 'orange' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'orange' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge variant="surface" color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
