import Tagname from "./Tagname";


export default function Info() {
    return (
        <div>
            <section className='flex mb-1' >
                <span className='mr-5'>깃허브 아이디 </span>
                <span className={`rounded-lg p-0.5`}>#jjjsun</span>
            </section>
            <section className='flex'>
                <span className='mr-5'>좋아하는 것들</span>
                <section className='flex flex-col gap-1.5'>
                    <Tagname tagname='수영'/>
                    <Tagname tagname='야구'/>
                    <Tagname tagname='볼링'/>
                </section>
            </section>
        </div>
    )
}