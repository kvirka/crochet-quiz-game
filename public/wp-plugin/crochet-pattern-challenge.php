<?php
/**
 * Plugin Name: Crochet Pattern Challenge
 * Plugin URI: https://example.com/crochet-pattern-challenge
 * Description: Adds an interactive crochet pattern game to your WordPress website.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * Text Domain: crochet-pattern-challenge
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Register shortcode to display the game
 */
function crochet_game_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(
        array(
            'height' => '700',
            'theme'  => 'default',
        ),
        $atts,
        'crochet_game'
    );
    
    // Sanitize attributes
    $height = intval($atts['height']);
    $theme = sanitize_text_field($atts['theme']);
    
    // Get plugin options
    $options = get_option('crochet_game_options', array('game_url' => ''));
    $game_url = !empty($options['game_url']) ? esc_url($options['game_url']) : '';
    
    // If no game URL is set, show a message to admin users
    if (empty($game_url) && current_user_can('manage_options')) {
        return '<div style="border: 2px dashed #ff6b6b; padding: 15px; background: #fff9f9;">
            <p><strong>Admin Notice:</strong> Please set your Crochet Game URL in the <a href="' . 
            admin_url('options-general.php?page=crochet-game-settings') . 
            '">plugin settings</a>.</p>
        </div>';
    }
    
    // Build the game container with the specified attributes
    $output = '<div class="crochet-game" data-theme="' . esc_attr($theme) . '" data-height="' . esc_attr($height) . '"></div>';
    
    // Add the script only if we have a game URL
    if (!empty($game_url)) {
        $output .= '<script src="' . esc_url(trailingslashit($game_url) . 'embedGame.js') . '"></script>';
    }
    
    return $output;
}
add_shortcode('crochet_game', 'crochet_game_shortcode');

/**
 * Register the settings page
 */
function crochet_game_add_settings_page() {
    add_options_page(
        'Crochet Pattern Challenge Settings',
        'Crochet Game',
        'manage_options',
        'crochet-game-settings',
        'crochet_game_settings_page'
    );
}
add_action('admin_menu', 'crochet_game_add_settings_page');

/**
 * Register settings
 */
function crochet_game_register_settings() {
    register_setting('crochet_game_options', 'crochet_game_options');
}
add_action('admin_init', 'crochet_game_register_settings');

/**
 * Settings page callback
 */
function crochet_game_settings_page() {
    $options = get_option('crochet_game_options', array('game_url' => ''));
    ?>
    <div class="wrap">
        <h1><?php echo esc_html__('Crochet Pattern Challenge Settings', 'crochet-pattern-challenge'); ?></h1>
        
        <form method="post" action="options.php">
            <?php settings_fields('crochet_game_options'); ?>
            
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="crochet_game_options[game_url]"><?php echo esc_html__('Game URL', 'crochet-pattern-challenge'); ?></label>
                    </th>
                    <td>
                        <input type="url" id="crochet_game_options[game_url]" name="crochet_game_options[game_url]" 
                               value="<?php echo esc_attr($options['game_url']); ?>" class="regular-text">
                        <p class="description">
                            <?php echo esc_html__('Enter the URL of your deployed Replit game (example: https://your-replit-app.repl.co)', 'crochet-pattern-challenge'); ?>
                        </p>
                    </td>
                </tr>
            </table>
            
            <?php submit_button(); ?>
        </form>
        
        <hr>
        
        <h2><?php echo esc_html__('How to Use', 'crochet-pattern-challenge'); ?></h2>
        <p><?php echo esc_html__('Add the game to any post or page using the shortcode:', 'crochet-pattern-challenge'); ?></p>
        <code>[crochet_game]</code>
        
        <p><?php echo esc_html__('You can customize the height and theme:', 'crochet-pattern-challenge'); ?></p>
        <code>[crochet_game height="600" theme="purple"]</code>
        
        <h3><?php echo esc_html__('Elementor Widget', 'crochet-pattern-challenge'); ?></h3>
        <p><?php echo esc_html__('To use with Elementor, add a "Shortcode" widget and paste the shortcode above.', 'crochet-pattern-challenge'); ?></p>
        
        <h3><?php echo esc_html__('Available Themes', 'crochet-pattern-challenge'); ?></h3>
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li><code>default</code> - Purple and pink theme</li>
            <li><code>green</code> - Green and teal theme</li>
            <li><code>blue</code> - Blue and navy theme</li>
        </ul>
    </div>
    <?php
}

/**
 * Add settings link on plugin page
 */
function crochet_game_settings_link($links) {
    $settings_link = '<a href="options-general.php?page=crochet-game-settings">' . __('Settings', 'crochet-pattern-challenge') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}
$plugin = plugin_basename(__FILE__);
add_filter("plugin_action_links_$plugin", 'crochet_game_settings_link');