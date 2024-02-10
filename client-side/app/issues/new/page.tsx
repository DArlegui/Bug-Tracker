'use client';
import { IssueType, createIssue } from '@/app/api/IssueService';
import { Button, Callout, TextField, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueType>();
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await createIssue(data);
            router.push('/issues');
          } catch (error: any) {
            setError(error.message);
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
    </div>
  );
};

export default NewIssuePage;
