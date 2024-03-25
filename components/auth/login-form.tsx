'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { LoginSchema } from '@/validation/user.schema';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Button } from '@/components/ui/button';
import { login } from '@/actions/auth/login';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl)
        .then((response) => {
          if (response?.error) {
            form.reset();
            toast.error(response?.error);
          } else if (response?.success) {
            const { provider, data } = response.signInData!;
            signIn(provider, data);
          }
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            }
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
