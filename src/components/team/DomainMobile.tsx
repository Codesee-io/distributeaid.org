import { Member } from './Member'
import { Members } from '@components/team/MemberComponentTypes'

type Props = {
  domainName: string
  members: {
    nodes: Members[]
  }
}

const DomainMobile = ({
  domainName,
  members,
}: {
  domainName: string
  members: Members[]
}) => {
  return (
    <div className="block md:hidden">
      <details>
        <summary className="bg-navy-800 w-full px-4 py-2 w-screen text-xl text-white rounded-none text-left mb-1">
          {domainName}
        </summary>
        {members.map((member) => (
          <Member member={member} />
        ))}
      </details>
    </div>
  )
}

export default DomainMobile
