'use client';

import * as z from 'zod';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';

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
import BackButton from './BackButton';

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

  function handleChange() {
    console.log(form.getValues());
  }

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bundleSizes',
  });

  const onSubmit = async (values: z.infer<typeof BundleSchema>) => {
    console.log('onSubmit function called');

    console.log('Submitting form with values:', values);
    values;

    startTransition(() => {
      if (isEditBundle) {
        console.log('Editing bundle with ID:', data?.id);

        editBundle(data?.id, values)
          .then((response: any) => {
            console.log('Response from editBundle:', response);

            if (response?.error) {
              toast.error(response?.error);
            } else if (response?.success) {
              toast.success(response?.success);
            }
          })
          .catch(() => toast.error('Something went wrong'));
      } else {
        console.log('Creating new bundle');

        createBundle(values)
          .then((response: any) => {
            console.log('Response from createBundle:', response);

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={handleChange}
        className="space-y-6"
      >
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Size </h2>
            <p className="text-sm text-gray-500 mb-3">
              {cloth.toUpperCase()} | {data.color.toUpperCase()} |{' '}
              {selectedSize?.type.toUpperCase()} | {selectedSize?.quantity}
            </p>
          </div>
          <BackButton />
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
                    <FormLabel className="flex gap-6">
                      <span>BundleSize {index + 1}</span>
                      <div>
                        <button
                          type="button"
                          onClick={handleAddBundleSizeInput}
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveBundleSize(index)}
                        >
                          -
                        </button>
                      </div>
                    </FormLabel>
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

          <Button type="submit" className="h-fit">
            {!isEditBundle ? 'Add' : 'Edit'} Bundle
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BundleForm;
