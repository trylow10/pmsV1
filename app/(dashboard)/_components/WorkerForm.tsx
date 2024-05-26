'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { WorkerSchema } from '@/validation/cloth.schema';
import { createWorker } from '@/actions/sheet/create';
import type { Worker } from '@prisma/client';
import { startTransition } from 'react';

type WorkerFormProps = {
  data: Worker | undefined;
  isEditWorker?: boolean;
  setModalOpen: (isOpen: boolean) => void;
};

function WorkerForm({ data, isEditWorker, setModalOpen }: WorkerFormProps) {
  const form = useForm<z.infer<typeof WorkerSchema>>({
    resolver: zodResolver(WorkerSchema),
    defaultValues: {
      name: data?.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof WorkerSchema>) => {
    try {
      startTransition(() => {
        if (isEditWorker) {
          // TODO : add edit worker method and call call here.
          // editWoker(data?.id, values).then((response: any) => {
          //   if (response?.error) {
          //     toast.error(response?.error);
          //   } else if (response?.success) {
          //     toast.success(response?.success);
          //     setModalOpen(false);
          //   }
          // });
        } else {
          createWorker(values).then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
              setModalOpen(false);
            }
          });
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="h-fit">
            {!isEditWorker ? 'Add' : 'Edit'} Worker
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default WorkerForm;
