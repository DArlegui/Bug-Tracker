'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description className="">
          Are you sure you want to delete this issue? <br />
          This action <strong>cannot</strong> be undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete(`/api/issues/${issueId}`);
                router.push('/issues');
                router.refresh();
              }}>
              Delete
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
