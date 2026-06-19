import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import Navbar from "@/components/navbar/Navbar";
import EmailForm from "@/components/properties/EmailForm";
import Image from "next/image";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { LuBath, LuBedDouble } from "react-icons/lu";

const PropertyPage = () => {
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <section className="py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* left */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25] text-primary">
                For sale
              </p>
              <h2 className="mt-3 text-4xl font-bold text-text md:text-5xl">
                Modern luxury apartment
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 my-6">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <FaMapMarkerAlt size={16} className="text-neutral-400" />
                  <span className="text-neutral-800 font-medium">
                    123 Main St, Anytown, USA
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <FaRulerCombined size={16} className="text-neutral-400" />
                  <span className="text-neutral-800 font-medium">
                    2000 sq. ft.
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuBedDouble size={16} className="text-neutral-400" />
                  <span className="text-neutral-800 font-medium">7 rooms</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuBath size={16} className="text-neutral-400" />
                  <span className="text-neutral-800 font-medium">
                    5 bathrooms
                  </span>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm">
              <p className="text-sm text-text ">Property Price</p>
              <h2 className="mt-2 text-4xl font-bold text-primary">
                $2.500.000
              </h2>
            </div>
          </div>
          <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
            <Image
              fill
              src="/images/image4.jpg"
              alt="property"
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {/* left */}
            <div className="lg:col-span-2">
              <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-text">
                  About this property
                </h2>
                <p className="mt-6 leading-relaxed text-neutral-700">
                  Located in a prestigious neighborhood, this magnificent
                  5-bedroom villa offers an unparalleled blend of luxury,
                  comfort, and sophistication. Every detail has been
                  meticulously crafted to provide an exceptional living
                  experience for those who demand the best in life.
                </p>
                <p className="mt-6 leading-relaxed text-neutral-700">
                  Located in a prestigious neighborhood, this magnificent
                  5-bedroom villa offers an unparalleled blend of luxury,
                  comfort, and sophistication. Every detail has been
                  meticulously crafted to provide an exceptional living
                  experience for those who demand the best in life.
                </p>
              </div>
            </div>
            {/* right */}
            <EmailForm />
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
};

export default PropertyPage;
