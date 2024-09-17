import dynamic from 'next/dynamic';

const CreateModelClient = dynamic(() => import('./CreateModelClient'), { ssr: false });

export default function CreateModel() {
  return <CreateModelClient />;
}