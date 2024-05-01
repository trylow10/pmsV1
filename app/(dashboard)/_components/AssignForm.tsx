'use client';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';
import { AssignBundleSchema } from '@/validation/cloth.schema';
import { generateTheme } from '@/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateBundle } from '@/actions/sheet/create';
import { editUpdatedBundle } from '@/actions/sheet/edit';
import DatePicker from './DatePicker';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

type AssignFormProps = {
  isEditBundle?: boolean;
  bId: string;
  size: any;
  color: any;
  companyCloth: any;
  workers: any;
};

function AssignForm({
  isEditBundle,
  size,
  bId,
  color,
  companyCloth,
  workers,
}: AssignFormProps) {
  const router = useRouter();

  const renderValues = {
    companyClothName: companyCloth,
    color: color,
    type: size.type,
    Bundle: size?.Bundle.flatMap((bundleItem: any) => ({
      bundleId: bundleItem.bundleId,
      sheetId: bundleItem.sheetId,
    })),
  };

  const form = useForm<z.infer<typeof AssignBundleSchema>>({
    resolver: zodResolver(AssignBundleSchema),
    defaultValues: {
      sheetId: renderValues?.Bundle[0]?.sheetId,
    },
  });

  const optionWorker = workers.map((worker: any) => ({
    label: worker?.name,
    value: worker?.id,
  }));

  const onSubmit = async (values: z.infer<typeof AssignBundleSchema>) => {
    try {
      startTransition(() => {
        if (isEditBundle) {
          editUpdatedBundle(bId, values).then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          });
        } else {
          updateBundle(bId, values).then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
              router.refresh();
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
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase">
            {renderValues?.companyClothName.toUpperCase()}
            {' | '}
            {renderValues?.color}
            {' | '}
            {renderValues.type.toUpperCase()} {' | '}
            {renderValues.Bundle.map((bundle: any) => bundle.bundleId)}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid xl:grid-cols-2 xl:gap-3">
              <FormField
                control={form.control}
                name="assignedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        }
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workers</FormLabel>
                    <FormControl>
                      <Select
                        theme={generateTheme}
                        value={optionWorker.find(
                          (option: any) =>
                            field.value && field.value.name === option.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange({ name: selectedOption.value });
                        }}
                        options={optionWorker}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sheetId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} placeholder="sheetId" type="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full mt-8 h-fit">
            <Button type="submit" className="h-fit">
              {!isEditBundle ? 'Add' : 'Edit'} Bundle
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default AssignForm;
