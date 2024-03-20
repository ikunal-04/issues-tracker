'use client';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const IssuesPage = () => {
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>)}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    setSubmitting(true);
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    setSubmitting(false);
                    setError('An unexpected error occurred.');
                }
            })}>
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>Submit new Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssuesPage;