/**
 * Supabase Authentication Helper Functions (auth.js)
 */
import { supabase } from '../supabase';

export async function signUp(fullName, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;
  if (data.user) {
    // Option 1 (Recommended): Insert profile after sign-up
    await supabase.from('profiles').upsert([{ 
      id: data.user.id, 
      full_name: fullName,
      email: email,
      created_at: new Date().toISOString()
    }]);
  }
  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function addIncome(amount, source, incomeDate = new Date().toISOString().split('T')[0]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  const { data, error } = await supabase.from('income').insert([{
    user_id: user.id,
    amount: Number(amount),
    source,
    income_date: incomeDate
  }]).select();
  if (error) throw error;
  return data;
}

export async function addExpense(amount, category, description, expenseDate = new Date().toISOString().split('T')[0]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  const { data, error } = await supabase.from('expenses').insert([{
    user_id: user.id,
    amount: Number(amount),
    category,
    description,
    expense_date: expenseDate
  }]).select();
  if (error) throw error;
  return data;
}
