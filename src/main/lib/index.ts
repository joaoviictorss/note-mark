import { appDirName, fileEnconding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcome-note.md?asset'

export const getRouteDir = () => {
  const dir = `${homedir()}/${appDirName}`
  return dir.replace(/\//g, '\\')
  // Converte todas as barras normais em barras invertidas
}
export const getNotes: GetNotes = async () => {
  const rootDir = getRouteDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEnconding,
    withFileTypes: false
  })

  // Verifica todos os arquivos dentro do diretório passado como parâmetro

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('Nenhuma anotação encontrada, criando uma anotação de boas vindas')

    const content = await readFile(welcomeNoteFile, { encoding: fileEnconding })

    await writeFile(`${rootDir}/Welcome.md`, content, { encoding: fileEnconding })

    notes.push('Welcome.md')
  }

  // Filtra todos os arquivos que terminam com .md

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRouteDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRouteDir()

  return readFile(`${rootDir}/${fileName}.md`, {
    encoding: fileEnconding
  })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRouteDir()

  console.log(`Escrevendo no arquivo ${fileName}`)
  const filePath = `${rootDir}/${fileName}.md`
  return writeFile(filePath, content, { encoding: fileEnconding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRouteDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Nova anotação',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Criar',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Cancelado')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)
  console.log(`path q eu quero: ${rootDir}`)
  console.log(`path q to passando: ${parentDir}`)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Erro',
      message: 'Não é possível criar uma anotação fora do diretório de anotações',
      buttons: ['Ok']
    })
    return false
  }

  console.log(`Criando nova anotacao: ${fileName}`)
  await writeFile(filePath, '', { encoding: fileEnconding })

  return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRouteDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Excluir anotação',
    message: `Tem certeza que deseja excluir a anotação "${fileName}"?`,
    buttons: ['Sim', 'Não'], // 0 - Sim, 1 - Não
    defaultId: 1,
    cancelId: 1,
    noLink: true
  })

  if (response === 1) {
    console.log('Excluir cancelado')
    return false
  }

  console.info(`Excluindo a anotação ${fileName}`)
  await remove(`${rootDir}/${fileName}.md`)
  return true
}
