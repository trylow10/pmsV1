'use client';

import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
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

type WorkerFormProps = {
  data: any;
  isEditWorker?: boolean;
  setModalOpen: (isOpen: boolean) => void;
};

function WorkerForm({ data, isEditWorker }: WorkerFormProps) {
  const form = useForm<z.infer<typeof WorkerSchema>>({
    resolver: zodResolver(WorkerSchema),
    defaultValues: {
      sheetId: '',
      bundleId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof WorkerSchema>) => {
    try {
      createWorker(values).then((response: any) => {
        if (response?.error) {
          toast.error(response?.error);
        } else if (response?.success) {
          toast.success(response?.success);
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
          <Controller
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

          <FormField
            control={form.control}
            name="bundleId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="bundleId" type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sheetId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="sheetId" type="hidden" />
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
