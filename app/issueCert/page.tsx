"use client";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import React , {useState , useEffect  , useRef} from 'react';
import { NFTStorage, File } from "nft.storage"
import { CONTRACT_ABI , CONTRACT_ADDRESS } from '../../utils/constant'
import { ethers } from 'ethers';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

function Page() {

    // Defining all states 
    const [name, setname] = useState<string>("");
    const [lastname,setlastname] = useState<string>("")
    const [remarks, setremarks] = useState<string>("");
    const [certificateName , setcertificateName] = useState<string>("")
    const [useraddress , setaddress] = useState<string>("");
    const [validity , setvalidity] = useState<string>("")
    const [url, seturl] = useState<string>('')
    const [isuploaded, setuploaded] = useState<string>();
    const [loading, setloading] = useState<boolean>(false)
    const [showUploadAlert, setShowUploadAlert] = useState<boolean>(false);
    const [showMintAlert, setShowMintAlert] = useState<boolean>(false);
    const [showMetamaskAlert, setShowMetamaskAlert] = useState<boolean>(false);
    const [status,setstatus] = useState<string>('');
    const [institute , setinstitute] = useState<string>("");
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);


    // defining  useRef for all inputes
    const fileRef = useRef(null);
    const instituteRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const attest = async() => {
        const eas = new EAS("0xC2679fBD37d54388Ce493F1DB75320D236e1815e");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        eas.connect(signer);

        const UID = "0x568c52be9b193efa14bc0f7f852e677ab38cf1d6170ee650267f3fea2f962823";

        // Initialize SchemaEncoder with the schema string
        const schemaEncoder = new SchemaEncoder("string CertName  ,  string remarks  , address  issuedTo ,uint24 validity , string personName");
        const encodedData = schemaEncoder.encodeData([
        { name: "CertName", value: certificateName, type: "string" },
        { name: "remarks", value: remarks, type: "string" },
        { name: "issuedTo", value:useraddress , type: "address" },
        {name:"validity" , value: validity , type:"uint24"},
        {name: "personName" , value: name+lastname , type:"string"}
        ]);

        const tx = await eas.attest({
            schema: UID,
            data: {
              recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
              expirationTime: BigInt(0),
              revocable: true, // Be aware that if your schema is not revocable, this MUST be false
              data: encodedData,
            },
        });

        const newAttestationUID = await tx.wait();

        alert("Attestation Id"+ newAttestationUID);
    }


    const mintnfthandler = async (ipnft: string, Useraddress: string, validitydate:string) => {
        try {
          setloading(true)
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
            
          let contract = new ethers.Contract(CONTRACT_ADDRESS , CONTRACT_ABI, signer)
          let transaction = await contract.mintCertificate(Useraddress, ipnft, Number(validitydate));
          await transaction.wait()
        //   setuploaded(true);
          setloading(false)
          setShowMintAlert(true); // Set showMintAlert to true after mintnfthandler function is completed
          setTimeout(() => {
            setShowMintAlert(false); // Set showMintAlert back to false after 5 seconds
          }, 5000);
        } catch (error) {
           console.log("mint nft handler error ",error)
        }
    }

    const uploadImage = async (imageData : Blob) : Promise<string> => {
        setloading(true)
        const nftstorage = new NFTStorage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM2Y5Mzc1ZEQ5ODY1YzhmN2FiODVENGRiRTM3NDhERWI4NTljRkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTc3MTE1MDk5NiwibmFtZSI6IlBBUkszIn0.eHLoAl-RBIxAqXmHm_KTQ553Ha-_18sZrnoxuXpGxMI` })
    
        // Check if instituteRef.current is not null
        const instituteValue:string = instituteRef.current ? instituteRef.current.value : 'American Crypto Academy';
    
        // Send request to store image
        const { ipnft } = await nftstorage.store({
          image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
          name: name,
          lastname:lastname,
          certName:certificateName,
          remarks : remarks,
          validity:validity,
          issuedTo : useraddress,
          issuerName : instituteValue,
          description: `${name} ${lastname} ${certificateName} ${remarks} ${validity} ${useraddress} ${instituteValue}`
        })
    
        // Save the URL
        // const NFturl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
        seturl(ipnft)
        // setuploaded(true);
        setloading(false);
        setShowUploadAlert(true); // Set showUploadAlert to true after uploadImage function is completed
        setTimeout(() => {
          setShowUploadAlert(false); // Set showUploadAlert back to false after 5 seconds
        }, 5000);
        return ipnft
    
    }

    

    // handle upload Function
    const onSubmitHandler = async (event:React.FormEvent) => {
    try {
      event.preventDefault();
      const files = fileRef.current.files[0];
      console.log( "File", files);
      console.log(name, remarks, validity,useraddress ,fileRef);
      console.log("Validity of the Cert" , validity);

      if(name == "" || remarks == "" || validity == "" || useraddress == "" || files == undefined){
        alert("Please Fill All The Details")  ;
        setIsModalOpen(true) ;   
      }else{
      const ipnft = await uploadImage(files);
      console.log(ipnft);
      await mintnfthandler(ipnft , useraddress , validity); 
      if (isCheckboxChecked) {
        await attest();
    }

      }
  
    } catch (error) {
      console.error(error.code); // Print the error on the consol
        // // Display a generic error message for other types of errors
        console.log(" handleUpload  error -> " + error)
      
    }
    };
 


  return (
    <>
    <Breadcrumb pageName="Issue Certificate" />

    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Certificate Information
                    </h3>
                </div>
                <form>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    First name
                                </label>
                                <input
                                    required
                                    onChange={(event) => setname(event.target.value)}
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Last name
                                </label>
                                <input
                                 required
                                 onChange={(event) => setlastname(event.target.value)}
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Certificate Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                required
                                onChange={(event) => setcertificateName(event.target.value)}
                                type="email"
                                placeholder="Enter Name Of Certificate"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Remarks
                            </label>
                            <input
                                required
                                onChange={(event) => setremarks(event.target.value)}

                                type="text"
                                placeholder="A Little Description"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-black dark:text-white">
                                Duration of Validity (In Days)
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    onChange={(event) => setvalidity(event.target.value)}
                                    type="number"
                                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>

        <div className="flex flex-col gap-9">



            {/* <!-- Sign In Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <form>
                    <div className="p-4.5">
                        <div className="mb-4.5 rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-2.5 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    File upload
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Attach file
                                    </label>
                                    <input
                                        required
                                        type={'file'}
                                        accept="image/*"
                                        multiple
                                        ref={fileRef}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4.5'>
                            <label className="mb-3 block text-black dark:text-white">
                                Select Organization
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                                fill="#637381"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                                fill="#637381"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                    <option ref={instituteRef}  value="American Crypto Academy">American Crypto Academy</option>
                                    <option  ref={instituteRef} value="Boston Univeristy">Boston Univeristy</option>
                                    <option ref={instituteRef}  value="Harvard University">Harvard University</option>
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Address Of Candidate <span className="text-meta-1">*</span>
                            </label>
                            <input
                                required
                                onChange={(event)  => setaddress(event.target.value)}
                                type="text"
                                placeholder="Enter your email address"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-5" style={{display:'flex' , alignContent:'center' , gap:'2rem' }}>
                            <label style={{display:'inline'}} className="mb-2.5 block text-black dark:text-white">
                                Check to Attest
                            </label>
                            <input
                                 style={{display:'inline'}}
                                type="checkbox"
                                checked={isCheckboxChecked}
                                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary dark:ring-offset-gray-800"
                            />
                        </div>

                        <button onClick={(e) => onSubmitHandler(e)} className="mb-3.5 mt-7.5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                           Issue Cert
                        </button>
                    </div>
                </form>



            </div>
        </div>
    </div>
</>
  )
}

export default Page