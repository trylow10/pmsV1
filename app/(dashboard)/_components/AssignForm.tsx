'use client';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';
import { BundleSchema } from '@/validation/cloth.schema';
import { generateTheme } from '@/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createBundle } from '@/actions/sheet/create';
import { editBundle } from '@/actions/sheet/edit';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type AssignFormProps = {
  isEditBundle?: boolean;
  size: any;
  sheet: any;
  companyCloth: any;
  workers: any;
};

function AssignForm({
  isEditBundle,
  size,
  sheet,
  companyCloth,
  workers,
}: AssignFormProps) {
  const defaultValues = {
    companyClothName: companyCloth,
    color: sheet,
    type: size.type,
    Bundle: size?.Bundle.flatMap((bundleItem: any) => ({
      id: bundleItem.id,
      bundleId: bundleItem.bundleId,
      assignedDate: bundleItem.assignedDate,
    })),
  };
  const form = useForm({
    resolver: zodResolver(BundleSchema),
    defaultValues: defaultValues,
  });

  const optionWorker = workers.map((worker: any) => ({
    label: worker?.name,
    value: worker?.id,
  }));

  const onSubmit = async (values: z.infer<typeof BundleSchema>) => {
    try {
      startTransition(() => {
        if (isEditBundle) {
          editBundle(defaultValues.Bundle.id, values).then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          });
        } else {
          createBundle(values).then((response: any) => {
            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          Color | <span>{defaultValues?.color}</span>
        </div>

        <div>
          Size | <span>{defaultValues.type}</span>
        </div>

        <div>
          Bundle ID |{' '}
          <span>
            {defaultValues.Bundle.map((bundle: any) => bundle.bundleId)}
          </span>
        </div>

        <div>
          Cloth Name | <span>{defaultValues.companyClothName}</span>
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

              <Controller
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workers</FormLabel>
                    <FormControl>
                      <Select
                        theme={generateTheme}
                        value={optionWorker.filter(
                          (option: any) =>
                            field.value &&
                            field.value.some(
                              ({ name }: { name: string }) =>
                                name === option.value
                            )
                        )}
                        onChange={(selectedOptions) => {
                          field.onChange(
                            selectedOptions.map(({ value }) => ({
                              name: value,
                            }))
                          );
                        }}
                        options={optionWorker}
                        isMulti
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default AssignForm;
