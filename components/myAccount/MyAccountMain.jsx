import ProfileForm from "./ProfileForm";
import UpdatePassword from "./UpdatePassword";

const MyAccountMain = () => {
  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col gap-4 border shadow p-3">
        {/* Side Bar Here */}
        {/* <SideBar /> */}

        {/* <div className="w-full sm:w-8/12 lg:w-9/12 bg-white shadow-md pb-10 px-2"> */}
        <div className="w-full">
          {/* Profile Form */}
          <ProfileForm />
        </div>

        <div className="w-full border-t">
          {/* Profile Form */}
          <UpdatePassword />
        </div>
      </div>
    </section>
  );
};

export default MyAccountMain;
