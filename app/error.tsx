'use client'
// ------------ Components ----------------
import { Error as ErrorComponent } from '@/components/ui';

const ErrorM = ({ error } : { error: Error} ) => <ErrorComponent error={error} />
export default ErrorM;