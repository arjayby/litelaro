import { CompleteProfileForm } from "@/components/complete-profile-form";

export default async function CompleteProfilePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <CompleteProfileForm />
      </div>
    </div>
  );
}
