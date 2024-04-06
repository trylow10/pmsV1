'use client';

import * as z from 'zod';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';
// import SelectCreatable from 'react-select/creatable';
import { BundleSchema } from '@/validation/cloth.schema';
import { generateTheme } from '@/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { editBundle } from '@/actions/sheet/edit';
import { createBundle } from '@/actions/sheet/create';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
  Sizes: {
    id: string;
    type: string;
    quantity: number;
  }[];
  workers?: {
    id: string;
    name: string;
  }[];
  cloth: string;
};

function BundleForm({
  data,
  isEditBundle,
  workers,
  Sizes,
  cloth,
}: BundleProps) {
  const [selectedSize, setSelectedSize] = useState<{
    type: string;
    quantity: number;
  } | null>(null);
  const [totalBundleSize, setTotalBundleSize] = useState(0);

  const optionSize = Sizes?.map((size: any) => ({
    label: size.type,
    value: size.id,
    quantity: size.quantity,
  })) as any;

  const handleAddBundleSizeInput = () => {
    const total = fields.reduce((sum, field) => sum + field.size, 0);
    if (selectedSize && total < selectedSize.quantity) {
      append({ size: 0 });
    }
  };

  const handleAddBundleSize = (size: number, index: number) => {
    const total = fields.reduce(
      (sum, field, i) => (i !== index ? sum + field.size : sum),
      0
    );
    if (selectedSize && total + size > selectedSize.quantity) {
      // Show an error message
      toast.error(`Total bundle size cannot exceed ${selectedSize.quantity}`);
    } else {
      setTotalBundleSize(total + size);
      form.setValue(`bundleSizes.${index}.size`, size);
    }
  };

  const handleRemoveBundleSize = (index: number) => {
    setTotalBundleSize(totalBundleSize - fields[index].size);
    remove(index);
  };

  const optionWorker = workers?.map((woker: any) => ({
    label: woker.name,
    value: woker.id,
  })) as any;

  const form = useForm<z.infer<typeof BundleSchema>>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {
      sizeId: data?.sizeId,
      bundleSizes: data?.bundleSizes ?? [{ size: 0 }],
      sheetId: data?.id,
      assignedDate: data?.assignedDate,
      assignedToId: data?.assignedToId ?? '',
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bundleSizes',
  });

  const onSubmit = async (values: z.infer<typeof BundleSchema>) => {
    startTransition(() => {
      if (isEditBundle) {
        editBundle(data?.id, values)
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
        <div>
          <h2 className="text-xl font-semibold mb-2">Total Size </h2>
          <p className="text-sm text-gray-500 mb-3">
            {cloth.toUpperCase()} | {data.color.toUpperCase()} |{' '}
            {selectedSize?.type.toUpperCase()} | {selectedSize?.quantity}
          </p>
        </div>

        <div className="space-y-4">
          <Controller
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select
                    options={optionSize}
                    theme={generateTheme}
                    onChange={(option) => {
                      field.onChange(option?.value);
                      setSelectedSize({
                        type: option?.label,
                        quantity: option?.quantity,
                      });
                    }}
                    value={optionSize?.find(
                      (option: any) => option.value === field.value
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.map((field, index) => (
            <div key={field.id}>
              <Controller
                control={form?.control}
                name={`bundleSizes.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BundleSize {index + 1}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="BundleSize"
                        type="number"
                        min="1"
                        max={selectedSize?.quantity}
                        value={field.value.size.toString()}
                        onChange={(e) =>
                          handleAddBundleSize(Number(e.target.value), index)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <button type="button" onClick={handleAddBundleSizeInput}>
                  Add Bundle
                </button>

                <button
                  type="button"
                  onClick={() => handleRemoveBundleSize(index)}
                >
                  Remove Bundle
                </button>
              </div>
            </div>
          ))}

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

          {/* <FormField
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
          /> */}
          {/* {
            <Controller
              control={form.control}
              name="assignedToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign To</FormLabel>
                  <FormControl>
                    <SelectCreatable
                      options={optionWorker}
                      theme={generateTheme}
                      onChange={(option) => field.onChange(option?.value)}
                      value={optionWorker?.find(
                        (option: any) => option.value === field.value
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          } */}
          <Button type="submit" className="h-fit">
            {!isEditBundle ? 'Add' : 'Edit'} Bundle
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BundleForm;
