import React, { useState } from 'react';
import Link from '@docusaurus/Link';

import { Photo } from '@site/src/components/utils';

import JSIcon from '@site/static/icons/docs/js.png';
import HtmlIcon from '@site/static/icons/docs/html.png';
import CSSIcon from '@site/static/icons/docs/css.png';
import TwigIcon from '@site/static/icons/docs/twig.png';
import FolderIcon from '@site/static/icons/docs/folder.png';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="border-t">
      {value === index && <div>{children}</div>}
    </div>
  );
};

const FolderTitle = ({ directoryName }) => {
  return (
    <div
      id={directoryName}
      className={`scroll-mt-16 flex gap-1 items-center text-sm bg-slate-100 dark:bg-slate-800 rounded-t-lg py-2 pl-4 folder-title`}
    >
      <Photo className="w-5 h-5 -mt-1 mr-2" img={FolderIcon} alt="Folder" />
      {directoryName}
    </div>
  );
};

const CodeTabs = ({ children }) => {
  return <div className="my-8">{children}</div>;
};

const TabItems = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const iconMap = {
    html: HtmlIcon,
    js: JSIcon,
    css: CSSIcon,
    twig: TwigIcon,
  };

  // Separate items and links
  const items = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.props.filetype !== 'link'
  );
  const links = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.props.filetype === 'link'
  );

  return (
    <div className="tab-items">
      <div className="border-b border-gray-200">
        <nav className="flex  bg-slate-100 dark:bg-slate-800 ">
          <div className="flex flex-wrap rounded-t-lg bg-slate-200 dark:bg-slate-700 ">
            {items.map(
              (child, index) =>
                React.isValidElement(child) && (
                  <div
                    key={child.props.value}
                    className={`flex gap-1 p-2 border-transparent border-solid border-b-2 text-sm font-medium cursor-pointer  ${
                      activeTab === index
                        ? 'border-b-indigo-500'
                        : 'text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-200'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <Photo
                      className="w-[18px] h-[18px] !mb-0"
                      img={iconMap[child.props.filetype] || TwigIcon}
                      alt={child.props.filetype}
                    />
                    {child.props.label}
                  </div>
                )
            )}
          </div>
          {links.map(
            (child) =>
              React.isValidElement(child) && (
                <Link
                  to={child.props.link}
                  key={child.props.value}
                  className="flex gap-1 items-center p-2 text-sm font-medium cursor-pointer text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-200"
                >
                  <Photo
                    className="w-5 h-5 -mt-1 ml-2 mr-1"
                    img={FolderIcon}
                    alt={child.props.filetype}
                  />
                  {child.props.label}
                </Link>
              )
          )}
        </nav>
      </div>
      {items.map(
        (child, index) =>
          React.isValidElement(child) && (
            <TabPanel key={child.props.value} value={activeTab} index={index}>
              <div>{child.props.children}</div>
            </TabPanel>
          )
      )}
    </div>
  );
};

const CodeTabItem = ({ children }) => {
  return <>{children}</>;
};

export { CodeTabs, CodeTabItem, TabItems, FolderTitle };
