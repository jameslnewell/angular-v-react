import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { setLightness } from 'polished';
import Github, { GithubRepository } from '../services/Github';
import { A300 } from './ui/colors';
import Alert from './ui/Alert';
import Button from './ui/Button';
import Box from './ui/Box';
import Heading from './ui/Heading';
import Input from './ui/Input';
import Link from './ui/Link';

injectGlobal`
  html, body {
    color: #444;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const cell = `
  padding: 0.25em;
`;

const repoCell = `
  ${cell}
  text-align: left;
`;

const starCell = `
  ${cell}
  font-size: 1.1em;
  text-align: right;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeadRow = styled.tr`
  border-bottom: 2px solid #ccc;
`;

const TableHeadCellForRepo = styled.th`
  ${repoCell}
`;

const TableHeadCellForStar = styled.th`
  ${starCell}
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px dotted ${setLightness(0.9, A300)};

  &:nth-child(even) {
    background-color: ${setLightness(0.99, A300)};
  }

  &:hover {
    background-color: ${setLightness(0.95, A300)};
  }

`;

const TableBodyCellForRepo = styled.td`
  ${repoCell}
`;

const TableBodyCellForStar = styled.td`
  ${starCell}
`;

export interface AppProps {
  github: Github;
}

export interface AppState {
  user: string;
  repos?: GithubRepository[];
  isLoading: boolean;
  message?: {
    type: 'error' | 'info';
    content: string;
  };
}

export class App extends React.Component<AppProps, AppState> {

  query?: Input;

  state: AppState = {
    user: '',
    isLoading: false
  };

  async load() {
    const { github } = this.props;
    const { user } = this.state;

    if (!user) {
      return;
    }

    try {

      this.setState({
        isLoading: true,
        repos: undefined,
        message: undefined
      });

      if (this.query) {
        this.query.focus();
        this.query.select();
      }

      const repos = await github.getReposByUser(user);

      this.setState({
        isLoading: false,
        repos,
        message: repos.length === 0 ? {
          type: 'info',
          content: 'User has no repos.'
        } : undefined
      });

    } catch (error) {
      this.setState({
        isLoading: false,
        message: {
          type: 'error',
          content: error.message
        }
      });
    }

  }

  handleUserChange = (user: string) => {
    this.setState({ user });
  }

  handleLoad = () => {
    this.load();
  }

  handleQueryMount = (query: Input) => {
    this.query = query;
  }

  render() {
    const { user, isLoading, repos, message } = this.state;
    return (
      <div>

        <Heading>Github Stars ✨</Heading>

        <form>
          <Box mt={1}>
            <Box width="max" mr={0.5}>
              <Input
                ref={this.handleQueryMount}
                autoFocus
                placeholder="Github user e.g. jameslnewell"
                onChange={this.handleUserChange}
              />
            </Box>
            <Box width="min">
              <Button
                isLoading={isLoading}
                isDisabled={user === ''}
                onClick={this.handleLoad}
              >
                Show
              </Button>
            </Box>
          </Box>
          {message && (
            <Box mt={0.5} mb={1}>
              <Alert type={message.type}>
                {message.content}
              </Alert>
            </Box>
          )}
        </form>

        {repos && repos.length !== 0 ? (
          <Table>
            <thead>
              <TableHeadRow>
                <TableHeadCellForRepo>Repository</TableHeadCellForRepo>
                <TableHeadCellForStar>⭐️</TableHeadCellForStar>
              </TableHeadRow>
            </thead>
            <tbody>
              {repos.map(repo => (
                <TableBodyRow key={repo.name} title="View on Github...">
                  <TableBodyCellForRepo>
                    <Link href={repo.href} target="github">{repo.name}</Link>
                  </TableBodyCellForRepo>
                  <TableBodyCellForStar>
                    {repo.stars}
                  </TableBodyCellForStar>
                </TableBodyRow>
              ))}
            </tbody>
          </Table>
        ) : null}

      </div>
    );
  }
};
