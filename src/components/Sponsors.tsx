export const Sponsors: React.FC<{
  tier: number
  sponsors: {
    name?: string
    login: string
    bio?: string
    description?: string
    avatarUrl?: string
  }[]
}> = ({ tier, sponsors }) => {
  return (
    <>
      <div className="group">
        <div className="group-title">${tier} / month</div>
        <div className="group-body">
          {sponsors.map((sponsor) => {
            const bio = sponsor.bio || sponsor.description

            return (
              <div className="group-item" key={sponsor.login}>
                {sponsor.avatarUrl && (
                  <span className="sponsor-avatar">
                    <img src={sponsor.avatarUrl} height="60" width="60" />
                  </span>
                )}
                <div>
                  <a href={`https://github.com/${sponsor.login}`}>
                    {sponsor.name || sponsor.login}
                    {sponsor.name && (
                      <span className="sponsor-login">({sponsor.login})</span>
                    )}
                  </a>
                  {bio && <div className="sponsor-description">{bio}</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style scoped>{`.group {
  margin-top: 50px;
}

.group-title {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.sponsor-login {
  color: #999;
}

.group-body {
  border: 1px solid var(--border-color);
}

.group-item {
  padding: 10px;
  display: flex;
  align-items: center;
}

.group-item + .group-item {
  border-top: 1px solid var(--border-color);
}

.sponsor-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.sponsor-description {
  color: var(--secondary-fg);
  font-size: 0.85rem;
}`}</style>
    </>
  )
}
