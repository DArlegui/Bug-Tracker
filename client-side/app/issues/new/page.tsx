'use client';
import { createIssue } from '@/app/api/IssueService';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField, TextFieldInput } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
