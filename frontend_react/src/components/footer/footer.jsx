const Footer = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <footer className="main-footer bg-neutral text-base-100 py-6 mt-auto">
                <div className="text-center">
                    <h3 className="text-primary font-semibold">
                        &copy; 2017-2018 NMB-MINEBEA THAI LTD. All Rights Reserved.
                    </h3>
                    {/* <div className="flex justify-center gap-4 mt-4">
                        <a href="#" className="text-info hover:text-primary">Facebook</a>
                        <a href="#" className="text-info hover:text-primary">LinkedIn</a>
                        <a href="#" className="text-info hover:text-primary">Twitter</a>
                    </div> */}
                </div>
            </footer>
        </div>
    );
};

export default Footer;
