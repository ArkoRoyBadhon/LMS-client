import CheckoutComponent from "@/components/checkout/CheckoutComponent";

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;
  return (
    <section>
      <div className="mainContainer py-[40px] min-h-[calc(100vh-200px)]">
        <CheckoutComponent id={courseId} />
      </div>
    </section>
  );
};

export default page;
