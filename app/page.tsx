import HomePageLink from '@/components/common/home/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg">
        <div className="text-center my-4">
          <h1 className="font-bold text-xl">Social</h1>
        </div>
        <HomePageLink href="/signin" label="Sign In" />
        <HomePageLink href="/signup" label="Sign Up" />
      </div>
    </main>
  );
}
