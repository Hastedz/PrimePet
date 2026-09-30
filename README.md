-- instalei npm install @react-navigation/bottom-tabs

      <TouchableOpacity
        style={[
          styles.button,
          carregando && styles.buttonDisabled,
        ]}
        onPress={handleSair}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? "Saindo..." : "Sair"}
        </Text>
      </TouchableOpacity>
