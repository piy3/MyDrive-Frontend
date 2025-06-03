import Folders_files from "@/components/ui/folder_file"

function Page() {
  return (
    <>
      <h2 className=' text-2xl '>Welcome to Drive</h2>
      <div className=' h-[5px] w-[30%] border-1 rounded-md bg-black'></div>
      <Folders_files parentFolderId={null} />
      
    </>
  )
}

export default Page