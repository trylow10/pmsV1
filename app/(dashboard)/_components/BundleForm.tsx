'use client';

import * as z from 'zod';
import { useState } from 'react';
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
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
  Sizes: {
    id: string;
    type: string;
    quantity: number;
  }[];
  cloth: string;
};

function BundleForm({ data, isEditBundle, Sizes, cloth }: BundleProps) {
  const [isLastFieldFilled, setIsLastFieldFilled] = useState(true);
  const form = useForm<z.infer<typeof BundleSchema>>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {
      sizeId: data?.sizeId,
      bundleSizes: data?.bundleSizes ?? [{ size: 0 }],
      sheetId: data?.id,
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bundleSizes',
  });

  const [selectedSize, setSelectedSize] = useState<{
    type: string;
    quantity: number;
  } | null>(null);
  const [totalBundleSize, setTotalBundleSize] = useState<number>(0);

  type Size = {
    id: string;
    type: string;
    quantity: number;
  };

  const optionSize = Sizes?.map((size: Size) => ({
    label: size.type,
    value: size.id,
    quantity: size.quantity,
  })) as any;

  const handleAddBundleSizeInput = () => {
    const lastField = fields[fields.length - 1];

    if (lastField.size === 0 || lastField.size === undefined) {
      toast.error('Please fill the last bundle size before adding a new one.');
      return;
    }
    const total = fields.reduce((sum, field) => sum + field.size, 0);
    if (selectedSize && total >= selectedSize.quantity) {
      toast.warning('No remaining size for other bundles.');
    } else if (
      selectedSize &&
      total < selectedSize.quantity &&
      fields.length < selectedSize.quantity &&
      Number(totalBundleSize) < selectedSize.quantity
    ) {
      append({ size: 0 });
      setIsLastFieldFilled(false);
    } else {
      toast.error(`Cannot add more bundles.`);
    }
  };

  const handleAddBundleSize = (size: number, index: number) => {
    const total = fields.reduce(
      (sum, field, i) => (i !== index ? sum + field.size : sum),
      0
    );
    if (selectedSize && total + size > selectedSize.quantity) {
      toast.error(`Total bundle size cannot exceed ${selectedSize.quantity}`);
    } else {
      setTotalBundleSize(total + size);
      form.setValue(`bundleSizes.${index}.size`, size);
      if (index === fields.length - 1) {
        setIsLastFieldFilled(true);
      }
      fields[index].size = size;
    }
  };

  const handleRemoveBundleSize = (index: number) => {
    if (fields.length <= 1) return;
    setTotalBundleSize((prevTotal) => prevTotal - fields[index].size);
    remove(index);
  };

  const onSubmit = async (values: z.infer<typeof BundleSchema>) => {
    try {
      if (fields.length === 0 || fields.some((field) => field.size === 0)) {
        toast.error('All bundle sizes must be filled with a valid number.');
        return;
      }

      startTransition(() => {
        if (isEditBundle) {
          editBundle(data?.id, values).then((response: any) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Size </h2>
            <p className="text-sm text-gray-500 mb-3 uppercase">
              {cloth} | {data.color}{' '}
              {selectedSize && ' | ' + selectedSize?.type}
              {selectedSize &&
                ' | ' + (selectedSize?.quantity - totalBundleSize)}{' '}
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
                      form.reset({
                        ...form.getValues(),
                        bundleSizes: [{ size: 0 }],
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
          {selectedSize &&
            fields.map((field, index) => (
              <div key={field.id}>
                <Controller
                  control={form?.control}
                  name={`bundleSizes.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-6 items-center">
                        <span>BundleSize {index + 1}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            className={cn('rounded-full')}
                            size="sm"
                            onClick={handleAddBundleSizeInput}
                          >
                            <Plus size="12" />
                          </Button>

                          <Button
                            type="button"
                            className={cn(
                              'rounded-full',
                              fields.length <= 1 && 'hidden'
                            )}
                            size="sm"
                            onClick={() => handleRemoveBundleSize(index)}
                          >
                            <Minus size="12" />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="BundleSize"
                          type="number"
                          min={'1'}
                          max={selectedSize?.quantity}
                          value={field.value === 0 ? '' : field.value}
                          onChange={(e) => {
                            handleAddBundleSize(Number(e.target.value), index);
                          }}
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
