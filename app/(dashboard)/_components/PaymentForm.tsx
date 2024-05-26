'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { startTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PaymentSchema } from '@/validation/cloth.schema';
import { createPayment } from '@/actions/sheet/create';
import { editPayment } from '@/actions/sheet/edit';

type PaymentProps = {
  data: any;
  isEditWorker?: boolean;
  setModalOpen: (isOpen: boolean) => void;
};

function Payment({ data, isEditWorker, setModalOpen }: PaymentProps) {
  console.log(setModalOpen);
  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
  });

  const onSubmit = async (values: z.infer<typeof PaymentSchema>) => {
    try {
      startTransition(() => {
        if (isEditWorker) {
          editPayment(data?.id, values)
            .then((response: any) => {
              if (response?.error) {
                toast.error(response?.error);
              } else if (response?.success) {
                toast.success(response?.success);
                setModalOpen(false);
              }
            })
            .catch(() => toast.error('Something went wrong'));
        } else {
          createPayment(values)
            .then((response: any) => {
              if (response?.error) {
                toast.error(response?.error);
              } else if (response?.success) {
                toast.success(response?.success);
                setModalOpen(false);
              }
            })
            .catch(() => toast.error('Something went wrong'));
        }
      });
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rate" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receviedQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Received Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Received Quantity"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="advance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advance</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Advance" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="h-fit">
            {!isEditWorker ? 'Add' : 'Edit'} Payment
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Payment;
