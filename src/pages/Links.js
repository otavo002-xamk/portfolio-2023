import React from 'react'
import { LanguageContext } from '../language-context'

function Links() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.links.title}</h1>
          <br />
          <br />
          <div className="clear-both">
            <div className="md:w-1/4 md:float-left">
              <p className="mb-8">
                <b>Git Repositories:</b>
              </p>
            </div>
            <div className="md:w-3/4 md:float-right pl-12 mb-8">
              <a href="https://gitea.com/woudiiii-girps">
                https://gitea.com/woudiiii-girps
              </a>
              <br />
              <a href="https://sourceforge.net/u/woudiiii-girps/profile">
                https://sourceforge.net/u/woudiiii-girps/profile
              </a>
              <br />
              <a href="https://github.com/otavo002-xamk">
                https://github.com/otavo002-xamk
              </a>
            </div>
          </div>
          <div className="clear-both">
            <div className="md:w-1/4 md:float-left">
              <p className="mb-8">
                <b>Docker Hub:</b>
              </p>
            </div>
            <div className="md:w-3/4 md:float-right pl-12 mb-8">
              <a href="https://hub.docker.com/u/woudisnakes">
                https://hub.docker.com/u/woudisnakes
              </a>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  )
}

export default Links
