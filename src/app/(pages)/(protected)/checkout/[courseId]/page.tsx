import CheckoutComponent from "@/components/checkout/CheckoutComponent";

const page = ({ params }: { params: { courseId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-[40px]">
        <CheckoutComponent id={params?.courseId} />
      </div>
    </section>
  );
};

export default page;
