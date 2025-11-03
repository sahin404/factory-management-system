
import Login5 from "@/components/login"
import { useAuthStore } from "@/stores/authStore"


const page = async() => {
  // const {checkCurrentUser} = useAuthStore();
  // const user = await checkCurrentUser();
  // console.log(user);
  return (
    <div>
      <Login5></Login5>
    </div>
  )
}

export default page