import React, { createRef } from 'react';

import { DataActions } from 'actions';
import { TabService, WindowService } from 'services';
import { TabGroup } from 'models';

import useTabGroups from 'hooks/use-tab-groups';

import TabGroupComponent from 'components/tab-group.jsx';

const exportGroups = (groups) => {
  DataActions.exportJson(groups).then(json => {
    const blob = new Blob([json]);

    const link = window.document.createElement("a");
    link.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    link.download = "tabgroups.tabsleeperbackup";
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  });
};

export default ({ router }) => {
  const [tabGroups, refreshTabGroups] = useTabGroups();
  const fileRef = createRef();

  const exportAllGroups = () => {
    exportGroups(tabGroups);
  }

  const importData = (evt) => {
    evt.preventDefault();

    let file = fileRef.current.files[0];

    let reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        DataActions.importJson(reader.result).then(() => {
          refreshTabGroups();
          fileRef.current.value = null;
        });
      }
    }

    reader.readAsText(file); 
  };

  return (
    <div className="manage-data">
      <h1>Manage my data</h1>


      <h2>Import</h2>
      <div className="manage-data--global-actions">
        <form onSubmit={importData}>
          <input type="file" ref={fileRef} name="file" accept=".tabsleeperbackup" />
          <button type="submit" className="btn btn-primary ml-1">Import tab groups</button>
        </form> 
      </div>

      <h2>Export</h2>
      <div className="manage-data--global-actions">
        <button type="button" className="btn btn-primary" onClick={exportAllGroups}>Export all groups</button>
      </div>
      <div className="manage-data--tab-groups">
        {tabGroups.map(g => {
          const exportGroup = (evt) => exportGroups([g]);

          return (
            <div key={g.uuid} className="manage-data--tab-group-row">
              <div className="manage-data--tab-group">
                <TabGroupComponent
                  group={g}
                  onDelete={refreshTabGroups}
                  onWake={refreshTabGroups} />
              </div>
              <div className="manage-data--tab-group-actions ml-1">
                <button type="button" className="btn btn-primary" onClick={exportGroup}>Export group</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
