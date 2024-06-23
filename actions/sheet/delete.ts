'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteClothDesign = async (id: string) => {
  try {
    const cloth = await db.cloth.delete({
      where: { id },
    });
    if (cloth) {
      revalidatePath('/');
      return { success: 'Cloth deleted successfully' };
    } else {
      return { error: 'No cloth Found' };
    }
  } catch (error) {
    console.log('Error deleting cloth object:', error);
    return { error: 'Error deleting cloth object', detailedError: error };
  }
};

export const deleteSheet = async (id: string) => {
  try {
    const sheet = await db.sheet.delete({
      where: { id },
    });
    if (sheet) {
      revalidatePath(`/view-sheet/${id}`);
      return { success: 'Sheet deleted successfully' };
    } else {
      return { error: 'No sheet Found' };
    }
  } catch (error) {
    console.log('Error deleting sheet object:', error);
    return { error: 'Error deleting sheet object', detailedError: error };
  }
};

export const deleteBundle = async (id: string) => {
  try {
    const bundle = await db.bundle.delete({
      where: { id },
    });

    if (bundle) {
      revalidatePath('/');
      return { success: 'Bundle deleted successfully' };
    } else {
      return { error: 'No bundle Found' };
    }
  } catch (error) {
    console.log('Error deleting bundle object:', error);
    return { error: 'Error deleting bundle object', detailedError: error };
  }
};

export const deletePayment = async (id: string) => {
  try {
    const payment = await db.payment.delete({
      where: { id },
    });
    if (payment) {
      revalidatePath(`/view-payment/${id}`);
      return { success: 'Payment deleted successfully' };
    } else {
      return { error: 'No payment Found' };
    }
  } catch (error) {
    console.log('Error deleting payment object:', error);
    return { error: 'Error deleting payment object', detailedError: error };
  }
};

export const deleteWorker = async (id: string) => {
  try {
    const worker = await db.worker.delete({
      where: { id },
    });
    revalidatePath('/view-worker');
    return { success: 'Worker deleted successfully' };
  } catch (error) {
    console.log('Error deleting worker object:', error);
    return { error: 'Error deleting worker object', detailedError: error };
  }
};
