import React from 'react';
import {Form, FormSpy} from 'react-final-form';
import {ScopeProvider} from '../../components/scope/provider';
import {profileValidator} from '../../components/validator';
import data from '../../mock/data.json';
import layout from '../../mock/layout.json';
import ComponentRender, {MemoLayoutRender} from '../../components/render';
import {DataReaction} from '../../components/data-reaction';
import findlayout from '../../components/utils/find-layout';
import {GroupDetail} from '../../components/index';
import AsideMenu from '../../components/layout/aside-menu';
import Text from '../../components/basic-input/text'
import './css.css';

const topLayout = findlayout({'metaData.for': 'top'}, layout);
const asideLayout = findlayout({'metaData.for': 'aside'}, layout);

const MemoGroupDetail = React.memo(GroupDetail);

const ProfilePage = () => {
  console.log('profile-page', data);
  const onSubmit = (e) => {
    console.log('onSubmit', e);
  };
  const {ProfileDataReaction} = DataReaction;
  const formOptions = {
    onSubmit,
    initialValues: {data},
    validate: profileValidator,
    decorators: [ProfileDataReaction],
    //subscription: {}
  };

  const onAsideGroupClick = (e) => {
    console.log('onAsideGroupClick', onAsideGroupClick);
  };

  return (
    <div key="profile-page" id="profile-page">
      {<Form {...formOptions}>
        {(props) => {
          return (<ScopeProvider scope="data">
            <section className="profile-page-layout">
              <section className="top">
                {
                  ComponentRender(topLayout, 'profile-page-top')
                }
              </section>
              <aside className="side">
                <MemoLayoutRender layout={asideLayout} index="profile-page-aside"/>
              </aside>
              <section className="main">
                <MemoGroupDetail layout={asideLayout} index="profile-page-detail"/>
              </section>
              <footer className="footer">
                <FormSpy subscription={{valid: true, submitting: true, pristine: true, values: true}}>
                  {
                    ({valid, submitting, values, form, pristine}) => {
                      return (<div className="component">
                        <div className="label"></div>
                        <div className="input">
                          <button type="submit" disabled={submitting || pristine || !valid}>
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                          >
                            Reset
                          </button>
                        </div>
                      </div>);
                    }
                  }
                </FormSpy>
              </footer>
            </section>
          </ScopeProvider>);
        }}
      </Form>}
    </div>);

};

//ProfilePage.whyDidYouRender = true;

export default ProfilePage;