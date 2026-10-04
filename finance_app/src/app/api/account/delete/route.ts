import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function DELETE(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Use the Supabase Service Role key to hard-delete the user from auth.users
    // This will cascade and delete their profile and associated PII due to FK constraints
    const { createClient } = require('@supabase/supabase-js');
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("Error deleting user from auth:", deleteError);
      return NextResponse.json({ error: "Failed to delete account completely" }, { status: 500 });
    }

    // Sign out user locally
    await supabase.auth.signOut();

    return NextResponse.json({ success: true, message: "Account completely deleted (GDPR compliant)." }, { status: 200 });
  } catch (error: any) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
