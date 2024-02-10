'use client';
import { createIssue } from '@/app/api/IssueService';
import { Button, TextField, TextFieldInput } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>(); //Keep track of the form state

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await createIssue(data);
          router.push('/issues');
        } catch (error) {
          console.error(error);
        }
      })}>
      <TextField.Root>
        <TextFieldInput placeholder="Title" {...register('title')} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <Button>Submit</Button>
    </form>
  );
};

export default NewIssuePage;
