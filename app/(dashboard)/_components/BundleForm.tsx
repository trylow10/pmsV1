'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { startTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { BundleSchema } from '@/validation/cloth.schema';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { createBundle } from '@/actions/sheet/create';
import { editBundle } from '@/actions/sheet/edit';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
};

function BundleForm({ data, isEditBundle }: BundleProps) {
  const form = useForm<z.infer<typeof BundleSchema>>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {
      bundleId: data?.bundleId,
      sizeId: data?.sizeId,
      bundleSize: data?.bundleSize,
      sheetId: data?.sheetId,
      assignedToId: data?.assignedToId,
      assignedDate: data?.assignedDate,
      receivedDate: data?.receivedDate,
      payments: data?.payments,
    },
  });

  const onSubmit = async (values: z.infer<typeof BundleSchema>) => {
    startTransition(() => {
      if (isEditBundle) {
        editBundle(data.id, values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      } else {
        createBundle(values)
          .then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bundleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BundleId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="bundleId"
                    type="text"
                    defaultValue={data?.bundleId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SizeId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="sizeId"
                    type="text"
                    defaultValue={data?.sizeId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bundleSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BundleSize</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="bundleSize"
                    type="text"
                    defaultValue={data?.bundleSize}
                  />
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
                <FormLabel>SheetId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="sheetId"
                    type="text"
                    defaultValue={data?.sheetId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedToId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AssignedToId</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="assignedToId"
                    type="text"
                    defaultValue={data?.assignedToId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AssignedDate</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ''
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receivedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ReceivedDate</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ''
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payments</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="payments"
                    type="number"
                    defaultValue={data?.payments}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit">
            {isEditBundle ? 'Edit' : 'Add'} Bundle
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BundleForm;
