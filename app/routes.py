from flask import Flask, render_template, redirect, request, flash
import json
import ast

logado = False
aluno = ""

@app.route('/')
def home():
    global logado
    logado = False

    return render_template('login.html')

@app.route('/admin')
def admin():
    if logado == True:
        with open('usuarios.json') as usuariosTemp:
            usuarios = json.load(usuariosTemp)
        return render_template("administrador.html",usuarios=usuarios)
    else:
        return redirect('/')

@app.route('/selectgame', methods=['POST', 'GET'])
def selectgame():
    return render_template('select_game.html')

@app.route('/login', methods=['POST', 'GET'])
def login():

    global logado
    logado = False

    global aluno
    aluno = ""

    print("rota login")
    nome = request.form.get('nome')
    senha = request.form.get('senha')

    if  nome == 'admin' and senha == 'admin':
                logado = True
                return redirect('/admin')

    with open('usuarios.json') as usuariosTemp:
        
    #conect_BD = mysql.connector.connect(host='junction.proxy.rlwy.net',port='32984', database='railway', user='root', password='pCYbwQbxwseDCtfOlXqxBYJWdeTfaOEik')
    #cont = 0
    #if conect_BD.is_connected():
    #    print('conectado')
    #    cursor = conect_BD.cursor()
    #    cursor.execute('select * from usuario;')
    #    usuarioDB = cursor.fetchall()
        usuarios = json.load(usuariosTemp)
        cont = 0
        for usuario in usuarios:
            cont +=1

            if usuario['nome'] == nome and usuario['senha'] == senha:
                aluno = usuario['nome']
                return render_template('/select_game.html')
            if cont >= len(usuarios):
                flash('Usuário inválido')
                return redirect('/')

@app.route('/cadastrarUsuario', methods=['POST', 'GET'])
def cadastrarUsuario():
    user = []
    nome = request.form.get('nome')
    senha = request.form.get('senha')
    user = [
        {
            "usuario": nome,
            "nome": nome,
            "senha": senha
        }
    ]
    with open('usuarios.json') as usuariosTemp:
        usuarios = json.load(usuariosTemp)

    usuarioNovo = usuarios + user

    with open('usuarios.json', 'w') as gravarTemp:
        json.dump(usuarioNovo, gravarTemp, indent=4 )

    return redirect('/admin')

@app.route('/excluirUsuario', methods=['POST'])
def excluirUsuario():
    global logado
    logado = True
    usuario = request.form.get('usuarioPexcluir')
    usuarioDict = ast.literal_eval(usuario)
    nome = usuarioDict['nome']
    with open('usuarios.json') as usuariosTemp:
        usuariosJson = json.load(usuariosTemp)
        for c in usuariosJson:
            if c == usuarioDict:
                usuariosJson.remove(usuarioDict)
                with open('usuarios.json', 'w') as usuarioAexcluir:
                    json.dump(usuariosJson, usuarioAexcluir, indent=4)

    flash(F'{nome} EXCLUIDO')
    return redirect('/admin')


@app.route('/alfabeto', methods=['GET'])
def alfabeto():
    return render_template('alfabeto.html')

@app.route('/rimas', methods=['GET'])
def rimas():
    return render_template('rimas.html')

@app.route('/memoria', methods=['GET'])
def memoria():
    return render_template('memoria.html')

@app.route('/sair')
def sair():
    return redirect('/')