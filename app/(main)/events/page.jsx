import { getUserEvents } from "@/actions/event";
import EventCard from "@/components/eventcard";
import { Suspense } from "react";


 
export default function Eventspage(){
return(
    <Suspense fallback={<div>Loading Events...</div>}>
        <Events/>
        </Suspense>
)
}

const Events = async () =>{
    const{events,username} = await getUserEvents();

    if(events.length === 0){
        return <p>You have&apos;t created any events yet.</p>
    }

    return(
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {events.map((event)=>{
                return(
                <EventCard key={event.id} event={event} username={username}/>
            )})}
        </div>
    )
}
 
